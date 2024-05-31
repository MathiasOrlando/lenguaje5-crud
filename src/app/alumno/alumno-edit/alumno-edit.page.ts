import { Component, OnInit } from '@angular/core';
import { collection, addDoc, updateDoc, getDoc, doc, Firestore, deleteDoc } from '@angular/fire/firestore';
import { Storage, StorageError, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable, deleteObject } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumno-edit',
  templateUrl: './alumno-edit.page.html',
  styleUrls: ['./alumno-edit.page.scss'],
})
export class AlumnoEditPage implements OnInit {
  id: any;
  alumno: any =[];
  avatar: string = '';

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private rt: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      if (this.id) {
        this.obtenerAlumno(this.id);
      }
    });
  }

  incluirAlumno = () => {
    let alumnoRef = collection(this.firestore, 'alumno');

    addDoc(alumnoRef, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
      fecha: new Date(this.alumno.fecha)
    }).then(doc => {
      this.volver();
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  editarAlumno = (id: string) => {
    const document = doc(this.firestore, 'alumno', this.id);

    updateDoc(document, {
      codigo: this.alumno.codigo,
      nombre: this.alumno.nombre,
      apellido: this.alumno.apellido,
      fecha: new Date(this.alumno.fecha)
    }).then(doc => {
      this.volver();
    }).catch((error) => {
      console.error("Error: ", error);
    });
  }

  obtenerAlumno = (id: string) => {
    const document = doc(this.firestore, 'alumno', id);

    getDoc(document).then(doc => {
      if (doc.exists()) {
        this.alumno = doc.data();
        if (this.alumno.fecha && this.alumno.fecha.toDate) {
          this.alumno.fecha = this.alumno.fecha.toDate()
            .toISOString()
            .substring(0, 10) + "";
        }
        if (this.alumno.avatar) {
          this.obtenerAvatarAlumno();
        }
      } else {
        this.alumno = {};
      }
    }).catch(error => {
      console.error("Error al obtener el alumno: ", error);
    });
  }

  volver = () => {
    this.rt.navigate(['/alumno-list']);
  }

  accion = () => {
    if (this.id) {
      this.editarAlumno(this.id);
    } else {
      this.incluirAlumno();
    }
    this.volver();
  }

  eliminarAlumno = () => {
    const document = doc(this.firestore, "alumno", this.id);

    deleteDoc(document).then(() => {
      console.log("Registro Eliminado");
      this.volver();
    }).catch(error => {
      console.error("Error al eliminar el alumno: ", error);
    });
  }

  uploadFile = (input: HTMLInputElement) => {
    if (!input.files) return;

    const files: FileList = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(this.storage, `avatars/alumno/${this.id}`);

        uploadBytesResumable(storageRef, file).on(
          'state_changed',
          this.onUploadChange,
          this.onUploadError,
          this.onUploadComplete
        );
      }
    }
  }

  onUploadChange = (response: UploadTaskSnapshot) => {
    console.log('onUploadChange', response);
  }

  onUploadError = (error: StorageError) => {
    console.error('onUploadError', error);
  }

  onUploadComplete = () => {
    this.editarAvatar();
    this.obtenerAvatarAlumno();
  }

  editarAvatar = () => {
    const document = doc(this.firestore, "alumno", this.id);
    updateDoc(document, {
      avatar: 'avatars/alumno/' + this.id
    }).then(() => {
      console.log("Avatar Editado");
    }).catch(error => {
      console.error("Error al editar el avatar: ", error);
    });
  }

  obtenerAvatarAlumno = () => {
    const storageRef = ref(this.storage, `avatars/alumno/${this.id}`);
    getDownloadURL(storageRef).then(url => {
      this.avatar = url;
    }).catch(error => {
      console.error("Error al obtener el avatar: ", error);
    });
  }

  eliminarAvatar = () => {
    const storageRef = ref(this.storage, `avatars/alumno/${this.id}`);
    deleteObject(storageRef).then(() => {
      console.log('Avatar eliminado del almacenamiento');

      const document = doc(this.firestore, "alumno", this.id);
      updateDoc(document, {
        avatar: ''
      }).then(() => {
        console.log('Avatar eliminado del documento');
        this.avatar = '';
      }).catch(error => {
        console.error('Error al actualizar el documento: ', error);
      });
    }).catch(error => {
      console.error('Error al eliminar el avatar del almacenamiento: ', error);
    });
  }
}
