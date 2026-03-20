<!DOCTYPE html>
<html>
<head>
    <title>FJ Spreadsheet View</title>
    <style>
        body { font-family: sans-serif; padding: 15px; background: #fdfdfd; }
        .status { font-size: 11px; font-weight: bold; margin-bottom: 15px; color: #666; }
        
        #data-container { 
            display: grid; 
            grid-template-columns: 1fr 1fr; /* Side-by-side */
            gap: 1px; 
            background-color: #ddd; 
            border: 1px solid #ddd;
        }

        .cell { 
            background: white; 
            padding: 10px; 
            font-size: 12px; /* Small size */
            line-height: 1.4;
            color: #333;
        }

        .header-cell { 
            background: #f2f2f2; 
            font-weight: bold; 
            text-align: center; 
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div id="status" class="status">Connecting to Sheet...</div>

    <div id="data-container">
        <div class="cell header-cell">Description</div>
        <div class="cell header-cell">Explanation</div>
        </div>

    <script src="script.js"></script>
</body>
</html>
