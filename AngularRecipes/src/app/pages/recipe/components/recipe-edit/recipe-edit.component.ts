import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // recupero id del parametro
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param.id;

        this.editMode = param.id != null;
        // editMode es true si al comparar param.id con null  me devuelve algo. 
         /* this.status = 'Ocupado' ? 'Libre' : 'Ocupado'; */
        // console.log(this.editMode);

        
    /*     if (this.editMode = param.id != null){
          this.router.navigate(['recipes', this.id], {
            queryParams: { ID: this.id },
            fragment: 'editing'
          });
        }else{
          this.router.navigate(['recipes/new'], {
            queryParams: { ID: -1 },
            fragment: 'new'
          });
        } */
        
      }
    );
  }

}
