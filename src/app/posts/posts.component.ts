import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PostsService } from './posts.service';
import { Post } from './posts.model';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostsComponent implements OnInit {

  private subs = new Subscription();

  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  public dataSource!: MatTableDataSource<Post>;
  expandedElement!: Post;
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  private dataArray: any;

  constructor(private posts:PostsService) { 
  }
  
  ngOnInit() {
    this.subs.add(this.posts.getPosts()
    .subscribe(res => {
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<Post>(this.dataArray);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    },
    (err: HttpErrorResponse) => {
      console.log(err)
    }))
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


}
