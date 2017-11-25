import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    constructor(private http:Http){}

    getTasks(query){
		var url = '/api/tasks?';
		console.log(query)
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

	updateTask(t){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/tasks/'+t._id, JSON.stringify(t), {headers: headers})
			.map(res => {
				if (res.status < 200 || res.status >= 300)
					throw new Error();
				else
					return res.json();
		});
	}
}
