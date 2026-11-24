import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/component/home/home.component";
import { ProductDashComponent } from "./shared/component/product/product-dash/product-dash.component";
import { ProductFormComponent } from "./shared/component/product/product-form/product-form.component";
import { ProductDetComponent } from "./shared/component/product/product-det/product-det.component";
import { PageNotFoundComponent } from "./shared/component/page-not-found/page-not-found.component";
import { AuthComponent } from "./shared/component/auth/auth.component";

import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { UserRoleGuard } from "./user-role.guard";
import { UserDashComponent } from "./shared/component/user/user-dash/user-dash.component";
import { FairDashComponent } from "./shared/component/user/fair-dash/fair-dash.component";
import { CanDeactGuard } from "./can-deact.guard";
import { ProductResolver } from "./product.resolver";


const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent
    },
    {
        path: "",
        component: AuthComponent
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            roles: ['superAdmin','admin','buyer']
        }

    },
    {
        path: "product",
        component: ProductDashComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: {
            roles: ['superAdmin','admin','buyer']
        },
        children: [
            {
                path: "add",
                component: ProductFormComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ":id",
                component: ProductDetComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ":id/edit",
                component: ProductFormComponent,
                // canActivate: [AuthGuard],
                canDeactivate : [CanDeactGuard]
            }
        ],
        resolve : {
            product : ProductResolver
        }
    },
    {
        path : 'user',
        component : UserDashComponent,
        canActivate: [AuthGuard, UserRoleGuard],
        data: {
            roles: ['superAdmin','admin']
        }
    },
    {
        path : 'fair',
        component : FairDashComponent,
        canActivate: [AuthGuard,UserRoleGuard],
        data: {
            roles: ['superAdmin']
        }
    },
    {
        path: "pageNotFound",
        component: PageNotFoundComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
