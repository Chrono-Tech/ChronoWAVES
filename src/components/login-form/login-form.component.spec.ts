import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../services/auth/auth.service';

class RouterStub {
  navigate(commands: any[]) { 
      return new Promise((resolve, reject) => resolve(true));
    }
}

describe('Component: LoginFormComponent', () => {
    let component: LoginFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [ReactiveFormsModule],
            providers: [
                AuthService, 
                { provide: Router, useClass: RouterStub }
            ]
        });

        const fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});