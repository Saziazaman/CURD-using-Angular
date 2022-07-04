
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {ApiService} from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular MaterialUI Curd';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'Comment', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(valu=>{
      if(valu === 'save'){
        this.getAllProduct();
      }
    })
  }
  getAllProduct(){
    this.api.getProduct()
    .subscribe({
      next:(responce)=>{
        this.dataSource = new MatTableDataSource(responce);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error:(error)=>{
        // alert('error while get records');
      }
    })
  }
  editProduct(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data : row 
    }).afterClosed().subscribe(valu=>{
      if(valu === 'update'){
        this.getAllProduct();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:()=>{
        alert("product delete successfully");
        this.getAllProduct();
      },
      error:()=>{

      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
