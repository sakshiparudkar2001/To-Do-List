import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm } from'@angular/forms';
import { UserService } from '../../Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit{
  userList:UserModel[]=[];
user:UserModel={
  assignedTo:"",
  
  
  DueDate:"",
  Priority:"",
  salary:0,
  Comments:"",
  Status:"",
}
constructor(private _userService:UserService){}
ngOnInit(): void {
  this.getUserList();
}


departmentList:string[]=["User 1","User 2","User 3","User 4","User 5"];
editMode:boolean=false;
getUserList()
{
  this._userService.getUsers().subscribe((res)=>{
    this.userList=res;

  });
}
// onSubmit(form:NgForm):void
// {
//     debugger;
//     if(this.editMode)
//     {
//       console.log(form);
//       this._userService.updateUser(this.user).subscribe((res)=>
//       {
//         this.getUserList();
//         form.reset();
        
//       });
//     }
//     else
//     {
//       console.log(form);
//       this._userService.addUser(this.user).subscribe((res)=>
//       {
//         this.getUserList();
//         form.reset();
        
//       });
//     }
    
// }
onSubmit(form: NgForm): void {
  if (this.editMode) {
    // If in edit mode, update the user
    this._userService.updateUser(this.user).subscribe((res) => {
      this.getUserList(); // Refresh user list
      form.reset(); // Reset form fields
      this.editMode = false; // Switch back to "Add User" mode
      this.user = {  // Reset the user object
        assignedTo: "",
        DueDate: "",
        Priority: "",
        salary: 0,
        Comments: "",
        Status: ""
      };
    });
  } else {
    // If not in edit mode, add the user
    this._userService.addUser(this.user).subscribe((res) => {
      this.getUserList(); // Refresh user list
      form.reset(); // Reset form fields
      this.user = {  // Reset the user object
        assignedTo: "",
        DueDate: "",
        Priority: "",
        salary: 0,
        Comments: "",
        Status: ""
      };
    });
  }
}
onEdit(userdata:UserModel){
  this.user=userdata;
  this.editMode=true;

}

onDelete(id: any) {
  const isConfirm = confirm("Are You Sure You Want To Delete?");
  if (isConfirm) {
    this._userService.deleteUser(id).subscribe((res) => {
      console.log("User deleted successfully."); 
      this.getUserList(); 
    }, (error) => {
      console.error("Error deleting user:", error); 
    });
  }
}
onResetForm( form:NgForm){
  form.reset();

}

}
