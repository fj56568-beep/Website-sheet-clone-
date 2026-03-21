const appsScriptUrl = '
https://script.google.com/macros/s/AKfycby1geIo_ItRjU5hkykrMUMA09srWgrpUsAkMzUedgJy7Ax36qTlqGIeZHXIcsBSv3J5/exec'; // The /exec link from Deployment

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const data = await response.json(); 
        
        // This targets your HTML IDs exactly
        document.getElementById('Description').innerText = data.description;
        document.getElementById('Explanation').innerText = data.explanation;
        
        document.getElementById('status').innerText = "Sync Live via Apps Script!";
        document.getElementById('status').style.color = "green";
    } catch (err) {
        console.error("Error:", err);
        document.getElementById('status').innerText = "Sync Failed. Check Script URL.";
    }
}

syncData();











