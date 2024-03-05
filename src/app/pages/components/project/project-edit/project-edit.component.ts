import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { getCurrentDate } from 'src/app/utils';

interface ProjectData {
  name: string;
  startDate: string;
  teamSize: number;
  budget: number;
  exprense: number;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  id: number = 0;
  project!: Project;

  listProgress: any = {
    Planning: 0,
    Developing: 25,
    Executing: 50,
    Review: 75,
    Completed: 100,
  };

  projectData: ProjectData = {
    name: '',
    startDate: getCurrentDate(),
    teamSize: 0,
    budget: 0,
    exprense: 0,
    status: 'Planning',
    progress: 0,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.projectService.findOneProject(this.id).subscribe((res) => {
      this.project = res.project;
      this.projectData = {
        name: this.project.name,
        startDate: getCurrentDate(),
        teamSize: this.project.teamSize,
        budget: this.project.budget,
        exprense: this.project.exprense,
        status: this.project.status,
        progress: this.project.progress,
      };
    });
  }

  handleUpdate() {
    this.projectData.progress = this.listProgress[this.projectData.status];
    this.projectService
      .updateProject(this.id, this.projectData)
      .subscribe(() => {
        this.router.navigateByUrl('admin/project/list');
      });
  }
}
