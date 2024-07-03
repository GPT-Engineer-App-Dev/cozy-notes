import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleSaveNote = () => {
    if (isEditMode) {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    } else {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
    }
    setCurrentNote({ title: "", content: "" });
    setIsEditMode(false);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsEditMode(true);
  };

  const handleDeleteNote = () => {
    setNotes(notes.filter(note => note.id !== noteToDelete.id));
    setIsDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsEditMode(false)}>Add Note</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit Note" : "Add Note"}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Title"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="mb-4"
            />
            <Textarea
              placeholder="Content"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="mb-4"
            />
            <Button onClick={handleSaveNote}>{isEditMode ? "Save Changes" : "Add Note"}</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4">
        {notes.map(note => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="icon" onClick={() => handleEditNote(note)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => { setNoteToDelete(note); setIsDeleteDialogOpen(true); }}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this note?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNote}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Notes;