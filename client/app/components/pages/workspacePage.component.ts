import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../models/Page';
import { User } from '../../models/User';
import { Annotation, DisplayedAnnotation } from '../../models/Annotation';
import { PageAnnotation } from '../../models/PageAnnotation';
import { Manuscript } from '../../models/Manuscript';
import { ManuscriptsService } from '../../services/manuscript.service';
import { UsersService } from '../../services/users.service';
import { WindowService } from '../../services/window.service';
import { WindowConAnno } from '../../models/WindowConAnno';
import { Component, Injectable, Input } from '@angular/core';
import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'workspace-page',
  templateUrl: '../../../../templates/workspacePage.component.html',
  styleUrls: ['../../../../styles/workspace.css']
})

export class WorkspacePageComponent {
	user: User;
	manuscripts: Manuscript[];
	manuscript: Manuscript;
	pages: Page[];
	pageAnnotation: PageAnnotation;
	page: Page;
	annotations: Annotation[];
	displayedAnnotations: DisplayedAnnotation[];
	loaded: Boolean;
	_window: WindowConAnno;

	constructor(private windowService: WindowService, private usersService: UsersService, private manuscriptsService: ManuscriptsService){
		this.loaded = false;
		this._window = windowService.nativeWindow;
		this.init();
	}

	init() {
		this.getLoggedUser();
		this.annotations = [];
		this.displayedAnnotations = [];
		this.initPage();
	}

	getLoggedUser() {
		this.usersService.getLoggedUser()
			.subscribe(
				res => {
					if (res){
						this.user = res;
					}
				},
				err => {
					alert('no logged user! redirect or something');
				});
	}

	initPage() {
		this.manuscriptsService.getManuscripts()
			.subscribe(
				res => {
					if (res) {
						this.manuscripts = res;
					}
				},
				err => {
					alert(err);
				}
			);
	}

	getCurrentManuscriptName() {
		if(this.manuscript)
			return this.manuscript.name;
		return "Select";
	}

	selectManuscript(manuscript: Manuscript) {
		this.resetBody();
		this.manuscript = manuscript;
		this.page = null;
		this.getPages();
	}

	getPages() {
		let query = { manuscript: this.manuscript._id };
		this.manuscriptsService.getPages(query)
			.subscribe(
				res => {
					if (res) {
						this.pages = res;
					}
				},
				err => {
					alert(err);
				}
			);
	}

	getCurrentPageName() {
		if(this.page)
			return this.page.name;
		return "Select";
	}

	selectPage(page: Page) {
		this.resetBody();
		this.page = page;
		this.loadPageAnnotation();
	}

	// Currently it loads the annotation of the current user
	loadPageAnnotation() {
		let query = { page: this.page._id, user: this.user._id };
		this.manuscriptsService.getPageAnnotations(query)
			.subscribe(
				res => {
					if (res) {
						if(res.length > 0){
							this.pageAnnotation = res[0];
							this.loaded = true;
						}
						else{
							this.createPageAnnotation();
						}
					}
				},
				err => {
					alert(err);
				}
			);
	}

	createPageAnnotation(){
		let options = {
			user: this.user._id,
			page: this.page._id,
			annotations: []
		}
		this.manuscriptsService.addPageAnnotation(options)
			.subscribe(
				res => {
					if (res){
						this.pageAnnotation = res;
						this.loaded = true;
					}
				},
				err => {
					alert('error while creating pageAnnotation!');
				});
	}

	resetBody() {
		this.loaded = false;
	}
}