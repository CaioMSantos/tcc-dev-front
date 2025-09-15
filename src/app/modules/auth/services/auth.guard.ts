import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Role } from '../models/roles.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    var usuarioPerfil;
    var userLogin = {
      relatorios: "",
      individual: "",
      listarAssociacoes: "",
      listarProdutos: "",
      desassociarProdutos: "",
      regimeEspecial: "",
      revisaoEan:"",
      usuariosPortal: "",
      auditoria: "",
      complemento: "",
      usuariosRevisao: "",
      conversorGenerico: "",
      nfe: "",
      gestaoBase: ""
    };
    this.authService.getUserByToken().subscribe(response => {
      if(response == null || response.perfilGestao == null)
        return;
      userLogin = response;
      usuarioPerfil = response.perfilGestao;
    });

    if(state.url == "/report/select-report" && userLogin.relatorios == "Nao"){
      return false;
    }
    if(state.url == "/dashboard/individually" && userLogin.individual == "Nao"){
      return false;
    }
    
    if(state.url == "/products/list-association" && userLogin.listarAssociacoes == "Nao"){
      return false;
    }
    
    if(state.url == "/products/list-product" && userLogin.listarProdutos == "Nao"){
      return false;
    }
    
    if(state.url == "/products/disassociate-product" && userLogin.desassociarProdutos == "Nao"){
      return false;
    }

    if(state.url == "/products/subsegment-special-meat" && userLogin.regimeEspecial == "Nao"){
      return false;
    }

    if(state.url == "/products/products-client" && userLogin.gestaoBase == "Nao"){
      return false;
    }

    if(state.url == "/commercial/review-ean" && userLogin.revisaoEan == "Nao"){
      return false;
    }

    if(state.url == "/manage/users-portal" && userLogin.usuariosPortal == "Nao"){
      return false;
    }

    if(state.url == "/audit/select-option-audit" && userLogin.auditoria == "Nao"){
      return false;
    }

    if(state.url == "/notifications/xml-cliente-tax" && userLogin.complemento == "Nao"){
      return false;
    }

    if(state.url == "/manage/users-revision" && userLogin.usuariosRevisao == "Nao"){
      return false;
    }

    if(state.url == "/generic-converter/converterFile" && userLogin.conversorGenerico == "Nao"){
      return false;
    }

    if(state.url == "/revisao-operador/nfe" && userLogin.nfe == "Nao"){
      return false;
    }

    if(usuarioPerfil != null){
      if(state.url == "/dashboard/index" && usuarioPerfil == "Financeiro")
        this.router.navigate(['/commercial/review-ean']);
    }
  
    if (currentUser) {
      return this.verifyTypeLogin(route);
    }
    else {
      this.authService.logout();
    return false;
    }
  }

  private verifyTypeLogin(route: ActivatedRouteSnapshot){
    const roles = route.data && route.data.roles as Role[];

    if(roles && !roles.some(r => this.authService.hasRole(r))){
      return false;
    }

    return true;
  }
}
