import { Component, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { Post, PostsService } from 'src/app/posts.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegistrationService, User } from 'src/app/registration.service';
import { Challenge } from 'src/app/models';
import { ChallengeService } from 'src/app/challenge.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {
  public static Route: Route = {
    path: 'post/edit/:id',
    component: EditPostComponent,
    resolve: {
      post: (route: ActivatedRouteSnapshot) => {
        const id = parseInt(route.paramMap.get('id')!);
        return inject(PostsService).getPost(id); 
      }
    }
  }

  public post: Post;
  public _user: User | undefined; // author of post
  public user: User | undefined; // current user
  challenge: Challenge | undefined;
  mediumTags: string[] = ['Digital 2D', 'Digital 3D', 'Real-time', '3D Printing', 'Traditional Ink', 'Traditional Dry Media', 'Traditional Paint', 'Traditional Sculpture', 'Mixed Media'];
  subjectTags: string[] = ['Abstract', 'Anatomy', 'Animals & Wildlife', 'Architectural', 'Automotive', 'Game Art', 'Book Illustration', 'Urban', 'Portait', 'Anime & Manga'];

  tags = this.mediumTags.concat(this.subjectTags)

  form = this.formBuilder.group({
    title: '',
    description: '',
    private: [false],
    tags: [[] as string[]]
  });

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postsService: PostsService,
    private registrationService: RegistrationService,
    private challengeService: ChallengeService) {
    
    // get post from route
    let data = route.snapshot.data as { post: Post };
    this.post = data.post;

    this.challengeService.getChallenge(this.post.challenge).subscribe(challenge => this.challenge = challenge)
    
    if (this.post.tags) {
      this.form.patchValue({ tags: this.post.tags });
    }
      
  }

  onSubmit() {
    let form = this.form.value;

    if (this.challenge?.createdBy) {
      form.tags?.push("meChallenge");
    } else {
      form.tags?.push("weChallenge");
    }

    this.postsService.updatePost(this.post.id!, form.title!, form.description!, form.private!, form.tags!).subscribe({
      next: (post) => this.onSuccess(post),
      error: (err) => this.onError(err)
    })

  }

  onSuccess(post: Post) {
    this.post = post;
    this.router.navigate([`/post/${this.post?.id}`])
  }

  onError(err: Error) {
    if (err.message) {
      window.alert(err.message);
    } else {
      window.alert("Unknown error: " + JSON.stringify(err));
    }
  }

}
