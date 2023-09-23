import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { MatTableModule } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';

describe('UserTableComponent (template)', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [MatTableModule],
      providers: [FavoriteService],
    });
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
  });

  it('should display the table with user data', () => {
    const users: User[] = [
      {
        id: 1,
        email: 'user1@example.com',
        first_name: 'User',
        last_name: 'One',
        avatar: 'avatar1.jpg',
      },
      {
        id: 2,
        email: 'user2@example.com',
        first_name: 'User',
        last_name: 'Two',
        avatar: 'avatar2.jpg',
      },
    ];

    component.dataSource.data = users;
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css('.user-row'));
    expect(tableRows.length).toBe(2);

    const firstRowCells = tableRows[0].queryAll(By.css('mat-cell'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('1');
    expect(firstRowCells[2].nativeElement.textContent).toContain('User');

    const secondRowCells = tableRows[1].queryAll(By.css('mat-cell'));
    expect(secondRowCells[0].nativeElement.textContent).toContain('2');
    expect(secondRowCells[2].nativeElement.textContent).toContain('User');
  });

  it('should emit toggleFavorite event when a button is clicked', () => {
    const user: User = {
      id: 1,
      email: 'user1@example.com',
      first_name: 'User',
      last_name: 'One',
      avatar: 'avatar1.jpg',
    };
    component.dataSource.data = [user];
    fixture.detectChanges();

    const toggleFavoriteSpy = jest.spyOn(component.toggleFavorite, 'emit');
    const toggleFavoriteButton = fixture.debugElement.query(By.css('button'));

    toggleFavoriteButton.triggerEventHandler('click', null);

    expect(toggleFavoriteSpy).toHaveBeenCalledWith(user);
  });
});
