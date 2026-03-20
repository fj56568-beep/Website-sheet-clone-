const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyWSlKzWeC9dkjsS-oCHcbrSn3aB42ZmiMjQwFP3MHsKe1VGdECczyNz8V_V1S8qLFg/exec';

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const allRows = await response.json(); 
        const container = document.getElementById('data-container');
        
        allRows.forEach(row => {
            // Column A cell
            const dCell = document.createElement('div');
            dCell.className = 'cell';
            dCell.innerText = row.description;
            
            // Column B cell
            const eCell = document.createElement('div');
            eCell.className = 'cell';
            eCell.innerText = row.explanation;
            
            container.appendChild(dCell);
            container.appendChild(eCell);
        });
        
        document.getElementById('status').innerText = "Loaded " + allRows.length + " rows.";
    } catch (err) {
        document.getElementById('status').innerText = "Error loading data.";
    }
}

syncData();
