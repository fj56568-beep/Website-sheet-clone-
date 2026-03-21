const appsScriptUrl = 'https://script.google.com/macros/s/AKfycby1geIo_ItRjU5hkykrMUMA09srWgrpUsAkMzUedgJy7Ax36qTlqGIeZHXIcsBSv3J5/exec';

async function syncData() {
    try {
        const response = await fetch(appsScriptUrl);
        const data = await response.json(); 
        
        const container = document.getElementById('content-list');
        container.innerHTML = ""; // This removes the "Connecting..." message

        // This loop automatically handles 10 rows or 1000 rows
        data.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = "30px";
            wrapper.style.padding = "10px";
            wrapper.style.borderBottom = "1px solid #eee";

            // Description (Column A)
            const d = document.createElement('div');
            d.style.fontWeight = "bold";
            d.style.fontSize = "16px";
            d.style.color = "#000";
            d.innerText = item.description;

            // Explanation (Column B)
            const e = document.createElement('div');
            e.style.fontSize = "14px";
            e.style.color = "#555";
            e.style.marginTop = "8px";
            e.innerText = item.explanation;

            wrapper.appendChild(d);
            wrapper.appendChild(e);
            container.appendChild(wrapper);
        });
        
        document.getElementById('status').innerText = "Sync Active: " + data.length + " items loaded.";
    } catch (err) {
        console.error("Error:", err);
        document.getElementById('status').innerText = "Sync Failed. Check browser console.";
    }
}

syncData();
