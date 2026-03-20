const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyWSlKzWeC9dkjsS-oCHcbrSn3aB42ZmiMjQwFP3MHsKe1VGdECczyNz8V_V1S8qLFg/exec';

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const allRows = await response.json(); 
        const container = document.getElementById('data-container');
        
        // Clear "Loading" text before adding rows
        document.getElementById('status').innerText = "Processing " + allRows.length + " rows...";

        allRows.forEach((row, index) => {
            // Only add if at least one column has text
            if (row.description || row.explanation) {
                const dCell = document.createElement('div');
                dCell.className = 'cell';
                dCell.innerText = row.description || ""; // Use empty string if cell is null
                
                const eCell = document.createElement('div');
                eCell.className = 'cell';
                eCell.innerText = row.explanation || "";
                
                container.appendChild(dCell);
                container.appendChild(eCell);
            }
        });
        
        document.getElementById('status').innerText = "Sync Active: " + allRows.length + " rows loaded.";
        document.getElementById('status').style.color = "green";
    } catch (err) {
        console.error("Connection error:", err);
        document.getElementById('status').innerText = "Error: Could not read data from Google.";
        document.getElementById('status').style.color = "red";
    }
}

syncData();
