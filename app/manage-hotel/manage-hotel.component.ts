import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../hotel.service';
import { Hotel } from '../../Models/HotelModel';

@Component({
  selector: 'app-manage-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage-hotel.component.html',
  styleUrl: './manage-hotel.component.css'
})
export class ManageHotelComponent implements OnInit  {


  hotels: Hotel[] = [];
  newHotel: Hotel = { id: 0, name: '', location: '', rating: 0, price: 0, imageUrl: '' };

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.displayHotels();
  }

  displayHotels(): void {
    this.hotelService.getHotels().subscribe(
      (hotels: Hotel[]) => (this.hotels = hotels),
      (error: any) => console.error('Failed to fetch hotels', error)
    );
  }

  addHotel(): void {
    this.hotelService.addHotel(this.newHotel).subscribe(
      () => {
        alert('Hotel added successfully');
        this.displayHotels();
        this.newHotel = { id: 0, name: '', location: '', rating: 0, price: 0, imageUrl: '' };
      },
      (error: { message: any; }) => alert(error.message)
    );
  }

  updateHotel(updatedHotel: Hotel): void {
    this.hotelService.updateHotel(updatedHotel).subscribe(
      () => {
        alert('Hotel updated successfully');
        this.displayHotels();
      },
      (error: { message: any; }) => alert(error.message)
    );
  }

  deleteHotel(id: number): void {
    this.hotelService.deleteHotel(id).subscribe(
      () => {
        alert('Hotel deleted successfully');
        this.displayHotels();
      },
      (error: { message: any; }) => alert(error.message)
    );
  }

  openUpdateForm(id: number): void {
    // Implement opening update form if needed
  }

  addToBook(id: number): void {
    // Implement adding to booking if needed
  }
}
