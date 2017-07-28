import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PageHeaderModule } from './../../shared';
import { SystemSettingComponent } from './system-setting.component';

describe('SystemSettingComponent', () => {
    let component: SystemSettingComponent;
    let fixture: ComponentFixture<SystemSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                PageHeaderModule,
            ],
            declarations: [ SystemSettingComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
