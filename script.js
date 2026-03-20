const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQED-EyB9Sgt2f2AARIcSJnHTOHGYBEm0oF-wkB4LeH6pCwvr24iSKWe3en1LeJxvg4NuehOIlrBw1T/pub?gid=0&single=true&output=csv';

async function syncData() {
    try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Split by lines
        const lines = csvText.split(/\r?\n/);

        // lines[0] is Header (Row 1)
        // lines[1] is Content (Row 2)
        if (lines.length >= 2) {
            // This regex handles the commas inside your long sentences
            const dataRow = lines[1].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (dataRow.length >= 2) {
                // Remove quotes and clean up text
                const colA_Content = dataRow[0].replace(/^"|"$/g, '').trim(); 
                const colB_Content = dataRow[1].replace(/^"|"$/g, '').trim(); 

                // Put the data into your HTML IDs
                const descElement = document.getElementById('Description');
                const explElement = document.getElementById('Explanation');

                if (descElement) descElement.innerText = colA_Content;
                if (explElement) explElement.innerText = colB_Content;
                
                console.log("✅ Row 2 content loaded successfully.");
            }
        }
        
        document.getElementById('status').innerText = "Sync Active!";
    } catch (err) {
        console.error("Error:", err);
        document.getElementById('status').innerText = "Sync Error. Check Sheet Publication.";
    }
}

syncData();
