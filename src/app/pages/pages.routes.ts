import { Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProductosComponent } from "./productos/productos.component";




export const pagesRoutes:Routes = [
    {
        path: 'pages',
        component:PagesComponent,
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'about',
                component:AboutComponent
            },
            {
                path:'productos',
                component:ProductosComponent
            },
            

        ]
    },
]
    
