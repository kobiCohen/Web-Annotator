import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    constructor(private http:Http){}

    getTasks(query){
		var url = '/api/tasks?';
		for(var p in query){
			if(query.hasOwnProperty(p)){
				url = url.concat(p + '=' + query[p]);
				url = url.concat("&")
			}
		}
		return this.http.get(url)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
    }

    getTasksByUser(query){
		var url = '/api/tasks/user/?';
		for(var p in query){
			if(query.hasOwnProperty(p)){
				url = url.concat(p + '=' + query[p]);
				url = url.concat("&")
			}
		}
		return this.http.get(url)
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
    }

    addTask(t) {
		var headers = new Headers();
		console.log(t)
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/tasks', JSON.stringify(t), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json(); 
		});
	}

	updateTask(task){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/tasks/'+task._id, JSON.stringify(task), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}
}
