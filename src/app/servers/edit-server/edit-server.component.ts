import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CanComponentDeactivate} from "./can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  canEdit=false;
  changesSaved=false;

  constructor(private serversService: ServersService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
     console.log(this.route.snapshot.queryParams);
     console.log(this.route.fragment);
    this.route.queryParams.subscribe(
      (queryParams : Params) => {
        this.canEdit = (queryParams['allowEdit'] && queryParams['allowEdit']=== '1');
      }
    );
    this.route.fragment.subscribe()
    const serverId = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(serverId);
    this.route.params.subscribe((params : Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'],{relativeTo : this.route});
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean{
    if(!this.canEdit){
      return true;
    }
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm("Are you sure you want to discard your changes?");
    }
    else{
      return true;
    }
  }


}
