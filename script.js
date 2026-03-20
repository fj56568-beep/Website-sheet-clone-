// Your specific Google Sheet CSV URL
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQED-EyB9Sgt2f2AARIcSJnHTOHGYBEm0oF-wkB4LeH6pCwvr24iSKWe3en1LeJxvg4NuehOIlrBw1T/pub?gid=0&single=true&output=csv';

async function syncSheetData() {
    const statusEl = document.getElementById('status');
    
    try {
        const response = await fetch(sheetUrl);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const csvText = await response.text();
        
        // Split by lines, then split by commas
        const rows = csvText.split('\n').map(row => row.split(','));

        rows.forEach(column => {
            // Clean up whitespace and quotes from Google Sheets
            const idFromSheet = column[0]?.trim().replace(/^"|"$/g, ''); 
            const valueFromSheet = column[1]?.trim().replace(/^"|"$/g, ''); 
            
            const targetElement = document.getElementById(idFromSheet);
            
            if (targetElement && valueFromSheet) {
                targetElement.innerText = valueFromSheet;
            }
        });

        statusEl.innerText = "Sync Active: Data updated from Google Sheets.";
        statusEl.style.color = "green";

    } catch (error) {
        console.error("Fetch error:", error);
        statusEl.innerText = "Sync Failed: Browser blocked the request. Try hosting on GitHub Pages.";
        statusEl.style.color = "red";
    }
}

// Initialize
syncSheetData();
