import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
	constructor(private http:Http){
	}

	getUsers(){
		return this.http.get('/api/users')
			.map(res => res.json());
	}

	addUser(newUser) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/users', JSON.stringify(newUser), {headers: headers})
			.map(res => res.json());
	}

	deleteUser(id){
		return this.http.delete('/api/users/'+id)
			.map(res => res.json());
	}
}