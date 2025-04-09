import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  noteContent: string = '';
  diagnosisList: { note: string; createdAt: Date }[] = [];

  ngOnInit(): void {
    // Load saved note from localStorage on component initialization
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      this.noteContent = savedNote;
    }
  }

  // Save note to localStorage and add to diagnosis list
  saveNote(): void {
    if (this.noteContent.trim()) {
      const currentTime = new Date(); // Get the current time
      const noteWithTime = { note: this.noteContent, createdAt: currentTime };
      localStorage.setItem('note', this.noteContent); // Save note to localStorage
      this.diagnosisList.push(noteWithTime); // Add the note with timestamp to diagnosis list
      this.noteContent = ''; // Clear the textarea after saving
      alert('Note saved successfully!');
    } else {
      alert('Please enter some text before saving!');
    }
  }

  // Clear the textarea and localStorage
  clearNote(): void {
    const confirmClear = confirm('Are you sure you want to clear the note? This action cannot be undone.');
    if (confirmClear) {
      this.noteContent = ''; // Clear the textarea content
      localStorage.removeItem('note'); // Remove the note from localStorage
      this.diagnosisList = []; // Clear the diagnosis list as well
      alert('Note cleared!');
    }
  }
}
