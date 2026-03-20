const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyWSlKzWeC9dkjsS-oCHcbrSn3aB42ZmiMjQwFP3MHsKe1VGdECczyNz8V_V1S8qLFg/exec';

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const data = await response.json(); 
        
        // This takes the "description" and "explanation" from Row 2 of your sheet
        document.getElementById('Description').innerText = data.description;
        document.getElementById('Explanation').innerText = data.explanation;
        
        document.getElementById('status').innerText = "Sync Live!";
        document.getElementById('status').style.color = "green";
    } catch (err) {
        console.error("Connection Error:", err);
        document.getElementById('status').innerText = "Connection Failed. Refresh and try again.";
    }
}

syncData();
