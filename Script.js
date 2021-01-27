let User1 = 1;
let userData = ({firstName, lastName, backgroundColor, fontSize}) => {
    let tbody = $(`
    <thead>
        <tr>
     <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
     </tr>
    </thead>
    <tr>
     <td>
     <div class="form-group form-check">
      <input type="checkbox" class="form-check-input rowCheckbox" onclick="selectedUser()">
       </div>
        </td>
         <td>
          <div class="form-group col-8">
           <input type="text" class="form-control form-control-lg" id="${"firstName" + User1}" value="${firstName}" disabled>
                  </div>                     
               </td>
               <td>
                  <div class="form-group col-8">
                      <input type="text" class="form-control form-control-lg" id="${"lastName" + User1}" value="${lastName}" disabled>
                     </div>
              </td>
               <td>
                   <div class="form-group">
                      <button type="button" class="btn btn-success" id="${User1}edit" onclick="editUser(this.id)" >Edit</button>
                    </div>
               </td>
               <td>
                    <div class="form-group">
                    <button type="button" class="btn btn-danger" id="${User1}"delete"" onclick="deleteUser(this)">Delete</button>
                    </div>
               </td>
               </tr>`);

    
    tbody.hide().fadeIn("slow");
    $("#tableData").append(tbody);

    $("#tableData tr:last td .form-control").css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });
};

let inputData=({firstName, lastName, backgroundColor, fontSize})=>{
    if(!firstName || !lastName || !backgroundColor || !fontSize){
        alert("Please Enter all the fields");
        return false;
    }
    return true;
};
let addUser = () => {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let backgroundColor = $("#backgroundColor").val();
    let fontSize=$("#fontSize").val();
    if(!inputData({firstName, lastName, backgroundColor, fontSize})){return ;}
    userData({
        firstName, lastName, backgroundColor, fontSize
    });
    ++User1;
   
    $("#UserSelect").prop("checked", false);

};
let Update_data=(type)=>{
    if(type=="add"){
        $("#addUser").text("Add");
        addUser.onclick = addUser;
    }
    else if(type=="update"){
        $("#addUser").text("Update");
        addUser.onclick = updateUser;
    }
}
let PositionOfUser = element => element.parentNode.parentNode.parentNode.rowIndex;
let selectedUser = () => {
    let selected = $('#tableData .rowCheckbox:checked').length;
    if (selected == 0) { 
        $("#deleteUser").attr("disabled",true); 
        $("#updateSection").hide();
    }
    else {
        $("#deleteUser").attr("disabled",false);
        $("#updateSection").show();
    }
    if (selected != 0 && selected == (User1 - 1)) { $("#UserSelect").prop("checked",true); }
    else { $("#UserSelect").prop("checked",false); }
    $("#rowsSelected").text(`Total ${selected} selected row(s)`);
}
let deleteUser = (element) => {
    let userPosition = PositionOfUser(element);
    $("#tableData tr").eq(userPosition).fadeOut("slow",function(){
        $(this).remove();
        selectedUser();
    });
    --User1;
    Update_data("add");
    $("#UserSelect").prop("checked",false);
};
let hexDigits = new Array
    ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

function rgbToHex(roo) {
    roo = roo.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#"+hex(roo[1]) + hex(roo[2]) + hex(roo[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

let findFontSize=(fontInPX)=>{
    if(fontInPX=="13px"){
        return "Small";
    }
    else if(fontInPX=="16px"){
        return "Medium";
    }
    else if(fontInPX=="18px"){
        return "Large";
    }
}

let editUser = (id) => {
    userPosition = Number.parseInt(id, 10);
    let firstNameString = "#firstName" + userPosition,
        lastNameString = "#lastName" + userPosition;
    $("#firstName").val($(firstNameString).val());
    $("#lastName").val($(lastNameString).val());
    let backgroundColor=rgbToHex($(firstNameString).css("background-color")),
          fontSize=findFontSize($(firstNameString).css("font-size"));

    $("#backgroundColor").val(backgroundColor);
    $("#fontSize").val(fontSize);
    Update_data("update");
};

let updateUser = () => {
  
    let firstNameString = "#firstName" + userPosition,
        lastNameString = "#lastName" + userPosition;

    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let backgroundColor = $("#backgroundColor").val();
    let fontSize=$("#fontSize").val();
    if(!inputData({firstName, lastName, backgroundColor, fontSize})){return ;}
    $(firstNameString).value = firstName;
    $(lastNameString).value = lastName;

    $(`${firstNameString}, ${lastNameString}`).css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });
    $("#addUser").text("Add");
    addUser.onclick = addUser;
};

let UserSelect = () => {
    let status = $("input[name=UserSelect]:checked").length;
    if (status!=0) {
        $('#tableData .rowCheckbox').prop("checked",true);
    }
    else {
        $('#tableData .rowCheckbox').prop("checked",false);
    }
    selectedUser();
};

let deleteUsers = () => {
    $('#tableData .rowCheckbox:checked').parent().parent().parent().remove();
    $('#UserSelect').prop("checked",false);
    Update_data("add");
    selectedUser();
};
let update=()=>{
    let backgroundColor = $("#updateBackgroundColor").val();
    let fontSize=$("#updatefontSize").val();
    if(!backgroundColor || !fontSize){
        alert("Please Enter all the fields");
        return ; 
    }

    let elements=$('#tableData .rowCheckbox:checked').parent().parent().parent().find(".form-control");
    elements.css({
        "background-color": backgroundColor,
        "font-size": fontSize
    });
    $("#updateBackgroundColor").val("");
    $("#updatefontSize option:eq(0)").prop("selected",true);
};