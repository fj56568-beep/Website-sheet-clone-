const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQED-EyB9Sgt2f2AARIcSJnHTOHGYBEm0oF-wkB4LeH6pCwvr24iSKWe3en1LeJxvg4NuehOIlrBw1T/pub?gid=0&single=true&output=csv';

async function syncData() {
    try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();
        
        // Split into lines
        const lines = csvText.split(/\r?\n/);

        lines.forEach(line => {
            // Split by comma, respecting quotes
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            
            if (columns.length >= 2) {
                // Remove quotes and whitespace
                const key = columns[0].replace(/^"|"$/g, '').trim(); 
                const value = columns[1].replace(/^"|"$/g, '').trim(); 
                
                console.log(`Checking Sheet: Key="${key}" Value="${value}"`);

                const element = document.getElementById(key);
                if (element) {
                    element.innerText = value;
                    console.log(`✅ Success! Updated ID: ${key}`);
                }
            }
        });
        
        document.getElementById('status').innerText = "Sync Active!";
    } catch (err) {
        console.error("Error:", err);
    }
}

syncData();
