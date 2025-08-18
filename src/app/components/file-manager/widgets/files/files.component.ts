import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { fileManager } from '../../../../shared/data/fileManager';

@Component({
  selector: 'app-files',
  imports: [CardComponent],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})

export class FilesComponent {

  public fileManager = fileManager;

}
