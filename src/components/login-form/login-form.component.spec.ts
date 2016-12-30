import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

describe('Component: LoginFormComponent', () => {
    let component: LoginFormComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormComponent],
            imports: [ReactiveFormsModule]
        });

        const fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});