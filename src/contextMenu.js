const contextMenu = (obj, x, y, e) => {
          let items = []
          if (y == null) {
              // Insert a new column
              if (obj.options.allowInsertColumn == true) {
                  items.push({
                      title:obj.options.text.insertANewColumnBefore,
                      onclick:function() {
                          obj.insertColumn(1, parseInt(x), 1);
                      }
                  });
              }
  
              if (obj.options.allowInsertColumn == true) {
                  items.push({
                      title:obj.options.text.insertANewColumnAfter,
                      onclick:function() {
                          obj.insertColumn(1, parseInt(x), 0);
                      }
                  });
              }
  
              // Delete a column
              if (obj.options.allowDeleteColumn == true) {
                  items.push({
                      title:obj.options.text.deleteSelectedColumns,
                      onclick:function() {
                          obj.deleteColumn(obj.getSelectedColumns().length ? undefined : parseInt(x));
                      }
                  });
              }

         } else {
             // Insert new row
             if (obj.options.allowInsertRow == true) {
                 items.push({
                     title:obj.options.text.insertANewRowBefore,
                     onclick:function() {
                         obj.insertRow(1, parseInt(y), 1);
                     }
                 });
                 items.push({
                     title:obj.options.text.insertANewRowAfter,
                     onclick:function() {
                         obj.insertRow(1, parseInt(y));
                     }
                 });
             }
             if (obj.options.allowDeleteRow == true) {
                 items.push({
                     title:obj.options.text.deleteSelectedRows,
                     onclick:function() {
                         obj.deleteRow(obj.getSelectedRows().length ? undefined : parseInt(y));
                     }
                 });
             }
         }
          return items;
        }

export default contextMenu
