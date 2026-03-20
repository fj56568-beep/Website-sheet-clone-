const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQED-EyB9Sgt2f2AARIcSJnHTOHGYBEm0oF-wkB4LeH6pCwvr24iSKWe3en1LeJxvg4NuehOIlrBw1T/pub?gid=0&single=true&output=csv';

async function syncData() {
    try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Split by lines
        const rows = csvText.split(/\r?\n/);

        rows.forEach(row => {
            // Regex to split by comma but ignore commas inside quotes
            const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 2) {
                // Clean up the ID from Column A and the Content from Column B
                const idFromSheet = columns[0].trim().replace(/^"|"$/g, ''); 
                const valueFromSheet = columns[1].trim().replace(/^"|"$/g, ''); 
                
                const target = document.getElementById(idFromSheet);
                if (target) {
                    target.innerText = valueFromSheet;
                }
            }
        });
        
        document.getElementById('status').innerText = "Sync Active: IDs Matched!";
        document.getElementById('status').style.color = "green";
    } catch (err) {
        console.error("Fetch error:", err);
        document.getElementById('status').innerText = "Sync Failed. Check Internet/CORS.";
        document.getElementById('status').style.color = "red";
    }
}

// Start the sync immediately
syncData();
