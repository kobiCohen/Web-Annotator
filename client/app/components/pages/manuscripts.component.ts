import { Component } from '@angular/core';
import { ManuscriptsService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/Manuscript';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from '../../services/users.service'

import { Page } from '../../models/Page';
import { User } from '../../models/User';


@Component({
  moduleId: module.id,
  selector: 'manuscripts',
  templateUrl: '../../../../templates/manuscripts.component.html',
  styleUrls: ['../../../../styles/manuscript.css']
})


export class ManuscriptsComponent {
	
	private newMan: Manuscript;
	private existingManuscript: Manuscript[];
	private currManuscript: Manuscript;
	private pageSrc : string;
	private pageName: String;
	private currUser :User;

	constructor(private mScriptService: ManuscriptsService, private uService: UsersService){
		this.init();
	}

	init(){
		this.newMan = new Manuscript(null);
		this.getExisting();
		this.currManuscript = null
		this.getCurrUser(); 	

		
	}
	getCurrManuscriptName(){
		if (this.currManuscript == null){
			return "Select Manuscript"
		}
		else {
			return this.currManuscript.name;
		}
	}
	getExisting(){

		this.mScriptService.getManuscripts().subscribe(res => {
			if (res){
				this.existingManuscript = res;
			}		
			},
			err => {
				alert("Manuscripts could not load!");
			});
		
	}
	setActiveMan(man: Manuscript){
		this.currManuscript = man;
	}
	createManuscript(){
		this.newMan.owner = this.currUser._id;
		console.log(this.newMan)
		this.mScriptService.addManuscript(this.newMan).subscribe(
			res => {
				alert("Manuscript created successfully!");
				this.getExisting();
				
			},
			err => {
				alert(err._body);
			});
	}
	createPage(){
		var data = {manuscript: this.currManuscript._id,
						 name:this.pageName, 
						 image:this.pageSrc}
		var p = new Page(data);
		this.mScriptService.createPage(p).subscribe(res =>{
			alert("Page was created succesfully")
		}, err=>{
			alert("Error creating page!")
		});
	}

	getCurrUser(){
		this.uService.getLoggedUser().subscribe(
			r=>{
				this.currUser = r;
			}
			,
			s=>{
				alert("NO LOGGED USER!!@##%%@$")
			}

			)
	}
}