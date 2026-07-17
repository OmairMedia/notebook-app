Notebook App project

Objective:

Allow user to save important piece of information online as you may find crucial information on social media which may disappear instantly. Notebook app comes to solve this issue problem.

Technical Overview:

- Tailwind css for designing
- Reusable components (Native)
- Supabase -> Backend as a service
- Form -> zod validation , login and signup form combined
- Composable based approach for logic handling

Reusable Components

Input:-

defineOption -> inheritAttr -> false , v-bind="$attrs" this is to build a fallthrough friendly component.
:value and @input event handling -> this is for getting and setting the data (equivalent to v-model)
id , aria-invalid , aria-describedby -> this is for accessibility

Form Field :-

Combination for these 3 components
label component
slot -> for input component
form error component
