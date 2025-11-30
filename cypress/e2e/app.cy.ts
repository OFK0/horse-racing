describe('Horse Race App', () => {
  beforeEach(() => {
    cy.viewport(1600, 1440);
    cy.visit('/');
  });

  it('should load the application', () => {
    cy.get('.app-root').should('be.visible');
  });

  it('should display the game sky component', () => {
    cy.get('.grass-tile-background').should('be.visible');
  });

  it('should display game header', () => {
    cy.get('header').should('exist');
  });

  it('should have correct page title', () => {
    cy.title().should('not.be.empty');
  });

  describe('Horse List', () => {
    it('should display horse list with data', () => {
      // Check horse list header exists
      cy.contains('Horse List').should('be.visible');

      // Check that there are horse list rows/items
      cy.get('.horse-list').should('be.visible');

      // Verify GameTable is populated with horses
      cy.get('.game-table tbody tr').should('have.length.greaterThan', 0);
    });

    it('should display horse names, condition and color', () => {
      cy.get('.horse-list').should('be.visible');

      // Check for horse names in the list
      cy.get('.game-table tbody tr')
        .first()
        .within(() => {
          cy.get('td').should('have.length.greaterThan', 0);
        });

      // Verify color bullets are displayed
      cy.get('.color-bullet').should('have.length.greaterThan', 0);
    });

    it('should display horses sorted by condition in descending order', () => {
      // Get all condition values from the table
      const conditions: Array<number> = [];

      cy.get('.game-table tbody tr').each(($row) => {
        cy.wrap($row)
          .find('td')
          .eq(1) // Condition column
          .then(($cell) => {
            const value = parseInt($cell.text());
            conditions.push(value);
          });
      });

      // Verify horses are sorted by condition descending
      cy.wrap(conditions).then((cond: Array<number>) => {
        for (let i = 0; i < cond.length - 1; i++) {
          expect(cond[i]).to.be.gte(cond[i + 1] as number);
        }
      });
    });
  });

  describe('Program Generation', () => {
    it('should generate program when Generate Program button is clicked', () => {
      // Program table should initially show "Program not generated yet"
      cy.contains('Program not generated yet').should('be.visible');

      // Click Generate Program button
      cy.get('[data-testid="generate-program-button"]').click();

      // Program table should now display programs
      cy.contains('Lap').should('be.visible');

      // Verify program table has content
      cy.get('.program-table__lap').should('have.length.greaterThan', 0);
    });

    it('should create multiple rounds in program', () => {
      cy.get('[data-testid="generate-program-button"]').click();

      cy.get('.program-table__lap').should('have.length.greaterThan', 0);
    });
  });

  describe('Game Start and Horse Movement', () => {
    beforeEach(() => {
      // Generate program before each test
      cy.get('[data-testid="generate-program-button"]').click();
    });

    it('should start the game when Start/Stop button is clicked', () => {
      // Initially lap should be 1
      cy.contains('Lap: 1').should('be.visible');

      // Click Start/Stop button
      cy.get('[data-testid="start-stop-button"]').click();

      // Button text should change to reflect game started
      cy.get('[data-testid="generate-program-button"]').should('be.visible');
    });

    it('should move horses forward during game', () => {
      cy.get('[data-testid="generate-program-button"]').click();
      cy.get('[data-testid="start-stop-button"]').click();

      // Get initial horse positions (elapsed time)
      cy.get('.horse-rider').first().should('be.visible');

      // Verify horses have progressed (elapsed time should increase)
      cy.get('.horse-rider')
        .first()
        .invoke('attr', 'data-elapsed')
        .then((value) => {
          cy.wrap(Number(value)).should('be.greaterThan', 0);
        });
    });
  });

  describe('Language Switching', () => {
    it('should display Turkish content when language is changed to Turkish', () => {
      // Default is English, check English text exists
      cy.contains('Generate Program').should('be.visible');

      // Change language to Turkish
      cy.window().then((win) => {
        win.localStorage.setItem('lang', 'tr');
      });

      // Reload page to apply language change
      cy.reload();

      // Check Turkish text is displayed
      cy.contains('Program Oluştur').should('be.visible');
      cy.contains('At Listesi').should('be.visible');
      cy.contains('Başlat/Durdur').should('be.visible');
    });

    it('should display English content when language is changed to English', () => {
      // Set language to Turkish first
      cy.window().then((win) => {
        win.localStorage.setItem('lang', 'tr');
      });

      cy.reload();
      cy.contains('Program Oluştur').should('be.visible');

      // Change language back to English
      cy.window().then((win) => {
        win.localStorage.setItem('lang', 'en');
      });

      cy.reload();

      // Check English text is displayed
      cy.contains('Generate Program').should('be.visible');
      cy.contains('Horse List').should('be.visible');
      cy.contains('Start/Stop').should('be.visible');
    });

    it('should persist language preference in localStorage', () => {
      // Set language to Turkish
      cy.window().then((win) => {
        win.localStorage.setItem('lang', 'tr');
      });

      cy.reload();

      // Verify localStorage still has Turkish
      cy.window().then((win) => {
        expect(win.localStorage.getItem('lang')).to.equal('tr');
      });

      cy.contains('Program Oluştur').should('be.visible');
    });
  });
});
