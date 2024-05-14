
$(function() {

  $('#view_transactions').click(function(){

    $.ajax({
      url:"/chain",
      type: 'GET',
      success: function(response){

        console.log(response);
        //Generate Transactions Table
        var transactions = [];
        count = 1;

        for (i = 1; i < response.length; i++) {
          for (j = 0; j < response["chain"][i]["transactions"].length; j++) {

            //format date
            var options = {  year: "numeric", month: "short",  day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"  };
            var date = new Date(response["chain"][i]["timestamp"] * 1000);
            var formattedDateTime = date.toLocaleTimeString("en-us", options);

            transaction = [count,
                          response["chain"][i]["transactions"][j]["recipient_public_key"],
                          response["chain"][i]["transactions"][j]["sender_public_key"],
                          response["chain"][i]["transactions"][j]["amount"],
                          formattedDateTime,
                          response["chain"][i]["block_number"]];
            transactions.push(transaction);

            count += 1;
          };
        };

        if ( $.fn.DataTable.isDataTable( '#transactions_table' ) ) {
            table = $('#transactions_table').DataTable();
        } else {
            table = $('#transactions_table').dataTable( {
                data: transactions,
                columns: [{ title: "#" },
                          { title: "Recipient Public Key"},
                          { title: "Sender Public Key"},
                          { title: "Amount"},
                          { title: "Timestamp"},
                          { title: "Block"}],
                columnDefs: [ {targets: [1,2,3,4,5], render: $.fn.dataTable.render.ellipsis( 25 )}]
            } );
        }

      },
      error: function(error){
        console.log(error);
      }
    });
  });

});