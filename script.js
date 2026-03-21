const appsScriptUrl = 'https://script.google.com/macros/s/AKfycby1geIo_ItRjU5hkykrMUMA09srWgrpUsAkMzUedgJy7Ax36qTlqGIeZHXIcsBSv3J5/exec';

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const data = await response.json(); 
        
        const container = document.getElementById('content-list');
        container.innerHTML = ""; // This removes the "Connecting..." text

        // This loop automatically builds a new section for EVERY row in your sheet
        data.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = "20px";
            wrapper.style.padding = "10px";
            wrapper.style.borderBottom = "1px solid #eee";

            // Description (Column A) - Bold and slightly larger
            const d = document.createElement('div');
            d.style.fontWeight = "bold";
            d.style.fontSize = "16px";
            d.innerText = item.description;

            // Explanation (Column B) - Standard text
            const e = document.createElement('div');
            e.style.fontSize = "14px";
            e.style.color = "#444";
            e.style.marginTop = "5px";
            e.innerText = item.explanation;

            wrapper.appendChild(d);
            wrapper.appendChild(e);
            container.appendChild(wrapper);
        });
        
        document.getElementById('status').innerText = "Sync Active: " + data.length + " rows loaded.";
        document.getElementById('status').style.color = "green";
    } catch (err) {
        console.error("Connection Error:", err);
        document.getElementById('status').innerText = "Sync Failed. Please check Authorization.";
        document.getElementById('status').style.color = "red";
    }
}

syncData();
