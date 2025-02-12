var serial_no=1;
var sum_amount=0;

// Function To Add Expense
function addExpense() {

    var expense_name=document.getElementById("expense_name").value;
    var amount=document.getElementById("amount").value;
    var category=document.getElementById("category").value;
    var date=document.getElementById("date").value;

    $('#myTable tbody').append('<tr> <td style="display: none;">'+serial_no+'</td><td>'+expense_name+'</td> <td>'+amount+'</td> <td>'+category+'</td> <td>'+date+'</td> <td><button type="button" class="btn btn-primary btn-sm" onclick="editExpense(this)">Edit</button> <button type="button" class="btn btn-secondary btn-sm" onclick="deleteExpense(this)">Delete</button> </td> </tr>');

    sum_amount+=Number(amount);
    document.getElementById('show_amount_sum').textContent="$"+Number(sum_amount);
    serial_no+=1;
}

// Function To Delete Expense
function deleteExpense(delete_expense) {

    var delete_amount = $(delete_expense).closest('tr').find('td').eq(2).text();
    sum_amount-=Number(delete_amount);
    document.getElementById('show_amount_sum').textContent="$"+Number(sum_amount);

    $(delete_expense).closest('tr').remove();
}

// Function to Edit Expense
function editExpense(edit_expense) {
    var add_button = document.getElementById('add_button');
    var update_button = document.getElementById('update_button');
    
    var get_serial_no = $(edit_expense).closest('tr').find('td').eq(0).text();
    var get_expense_name = $(edit_expense).closest('tr').find('td').eq(1).text();
    var get_amount = $(edit_expense).closest('tr').find('td').eq(2).text();
    var get_category = $(edit_expense).closest('tr').find('td').eq(3).text();
    var get_date = $(edit_expense).closest('tr').find('td').eq(4).text();

    document.getElementById("expense_name").value = get_expense_name;
    document.getElementById("amount").value = get_amount;
    document.getElementById("category").value = get_category;
    document.getElementById("date").value = get_date;
    
    add_button.setAttribute('disabled', '');
    update_button.removeAttribute('disabled');

    window.filter_serial_no =get_serial_no; 
    window.get_amount=get_amount;
}

// Function to Update 
function updateExpense() {

    var update_expense_name = document.getElementById("expense_name").value;
    var update_amount = document.getElementById("amount").value;
    var update_category = document.getElementById("category").value;
    var update_date = document.getElementById("date").value;
    
    $('#myTable tbody tr').each(function() {
        var table_serial = $(this).find('td').eq(0).text();

        if (table_serial === window.filter_serial_no) {
            $(this).find('td').eq(1).text(update_expense_name);
            $(this).find('td').eq(2).text(update_amount);
            $(this).find('td').eq(3).text(update_category);
            $(this).find('td').eq(4).text(update_date);
        }
    });

    if(update_amount>get_amount){
        var difference=update_amount-get_amount;
        sum_amount+=Number(difference);
        document.getElementById('show_amount_sum').textContent="$"+Number(sum_amount);
    }
    else{
        var difference=get_amount-update_amount;
        sum_amount-=Number(difference);
        document.getElementById('show_amount_sum').textContent="$"+Number(sum_amount);
    }
    

    document.getElementById('update_button').setAttribute('disabled', '');
    document.getElementById('add_button').removeAttribute('disabled');
}
