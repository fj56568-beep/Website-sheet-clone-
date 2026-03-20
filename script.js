const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQED-EyB9Sgt2f2AARIcSJnHTOHGYBEm0oF-wkB4LeH6pCwvr24iSKWe3en1LeJxvg4NuehOIlrBw1T/pub?gid=0&single=true&output=csv';

async function syncData() {
    try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Split into lines
        const lines = csvText.split(/\r?\n/);

        // We want the SECOND row (index 1) because the first row is your headers
        if (lines.length >= 2) {
            const dataRow = lines[1].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (dataRow.length >= 2) {
                const descriptionContent = dataRow[0].replace(/^"|"$/g, '').trim(); 
                const explanationContent = dataRow[1].replace(/^"|"$/g, '').trim(); 

                // Injecting directly by the IDs we know are in your HTML
                document.getElementById('Description').innerText = descriptionContent;
                document.getElementById('Explanation').innerText = explanationContent;
                
                console.log("✅ Data successfully pulled from Row 2!");
            }
        }
        
        document.getElementById('status').innerText = "Sync Active!";
    } catch (err) {
        console.error("Error:", err);
        document.getElementById('status').innerText = "Sync Error.";
    }
}

syncData();
