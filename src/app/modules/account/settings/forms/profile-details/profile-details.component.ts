import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { UserDTO } from '../../../../auth/models/UserDTO';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  providers: [MessageService]
})
export class ProfileDetailsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;

  //USUARIO
  usuario: any;

  submitted: boolean = false;
  hasError: boolean;
  userForm: FormGroup;
  private unsubscribe: Subscription[] = [];
  value3: string;
  returnUrl: string;

  constructor(private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.hasError = false;
    this.form();
    this.getUser();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  validacoes = {
    'campoObrigatorio': [
      { type: 'required', message: 'Este campo é obrigatório.' }
    ]
  };

  form() {
    this.userForm = this.formBuilder.group({
      userLogin: [null],
      userPwd: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      ],
      userPk: [null]
    })
  }

  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    }, 1500);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getUser() {
    return this.authService.getUserByToken().subscribe(response => {
      this.usuario = response;
      this.userForm.patchValue({
        userLogin: this.usuario.userLogin,
        userPk: this.usuario.userPk,
      });
    });
  }

  updateUser() {
    var formValue = this.userForm.value;

    if ((<FormGroup>this.userForm.controls['userPwd']).invalid){
      this.submitted = true;
      return false;
    }

    if((<FormGroup>this.userForm.controls['userPwd']).value.length < 7){
      this.submitted = true;
      this.messageService.add({
        key: 'bc', severity: 'error', summary: 'Senha invalida', life: 10000,
        detail: 'Senha deve conter pelo menos 7 digitos'
      });
      return false;
    }


    this.spinner.show();

    this.accountService.UpdateUserPassword(formValue).subscribe((response) => {
      if (response.result == false) {
        this.messageService.add({
          key: 'bc', severity: 'error', summary: 'Dados do Usuário',
          detail: 'Não foi possivel atualizar os dados.', life: 10000
        });
      }
      else {
        this.login();
        this.messageService.add({
          key: 'bc', severity: 'success', summary: 'Dados do Usuário',
          detail: 'Os dados foram alterados com sucesso.', life: 10000
        });
      }
      this.spinner.hide();
    }, (exception: Response) => {
      this.spinner.hide();
      this.messageService.add({ severity: 'error', summary: '', detail: 'Não foi possivel alterar os dados. ' });
    })

  }

  login() {
    this.hasError = false;

    var parameters = {
      username: this.userForm.controls["userLogin"].value,
      password: this.userForm.controls["userPwd"].value
    } as UserDTO;


    const loginSubscr = this.authService
      .login(parameters)
      .pipe(first())
      .subscribe((user: UserDTO | undefined) => {
        if (user) {
          //this.router.navigate([this.returnUrl]);
          //document.location.reload();
        } else {
          this.hasError = true;
          this.messageService.add({
            key: 'bc', severity: 'error',
            detail: 'Usuario ou senha incorretos.', life: 10000
          });
        }
      });
    this.unsubscribe.push(loginSubscr);
  }
}
