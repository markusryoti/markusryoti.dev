---
title: 'Htmx, Go and Tailwind todo app'
pubDate: 2024-01-10
description: 'A simple htmx todo app built with Go and Tailwind'
author: 'Markus Ryöti'
tags: ['htmx', 'go']
---

# Htmx and Go todo app

I have been working with Go now for a few years and I have really enjoyed it. The idea of writing web applications with just Go has been appealing for me but that hasn't really fully materialized. In order to have a well working application you need client side Javascript to handle the UI interactions and that has basically meant that you need a frontend framework to go along with your Go API. But with the introduction of [htmx](https://htmx.org/) things have seemingly changed a bit. I decided to give htmx a spin with everyone's favorite web app idea - a todo list.

Here's a screenshot of my first htmx application. Don't mind the ugliness, we are here to do backend development aren't we?

![Screenshot of the application](../../assets/images/htmx-todo.png 'htmx todo app')

You can find the full source code from [Github](https://github.com/markusryoti/htmx-todo).

## Go server

There are multiple ways to write APIs in Go. The standard library provides a lot of stuff already, so you can get away without using a framework at all. However [Echo](https://echo.labstack.com/) is a popular option nowadays and I haven't used that earlier so I ended up giving it a go. Everything was really simple, here's the entry point for the final application.

```go
// main.go

func main() {
	t := &Template{
		templates: template.Must(template.ParseGlob("public/views/*.html")),
	}

	e := echo.New()
	e.Renderer = t

	e.Static("/public", "public")

	e.GET("/", home)
	e.POST("/todos/add", add)
	e.PATCH("/todos/:id", toggle)
	e.DELETE("/todos/:id", remove)

	e.Logger.Fatal(e.Start(":8080"))
}

```

This initializes echo and sets all the routes the app is using. `Template` is a custom type that implements Echo's `Render` interface. This how that looks like.

```go
// main.go

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}
```

With this we are ready to render html files inside our application. It looks something like this

```go
// main.go

var todos []*Todo

type Todo struct {
	Id   string `param:"id"`
	Name string `form:"name"`
	Done bool
}

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

type Home struct {
	Title string
	Name  string
	Todos []*Todo
}

func home(c echo.Context) error {
	return c.Render(http.StatusOK, "index.html", &Home{
		Name:  "A killer htmx todo app",
		Title: "Home",
		Todos: todos,
	})
}

```

As you can see, there's not much to it.

## Templating

We can now take a look at our index page

```html
<!-- index.html -->

{{ template "base" . }} {{ define "title"}} Home {{end}} {{ define "body"}}

<h1 class="text-3xl font-bold">{{ .Name }}</h1>

<form
	hx-post="/todos/add"
	hx-target="#todo-list"
	hx-swap="beforeend"
	hx-on::after-request="this.reset()"
	class="py-8"
>
	<h4 class="text-xl">Add new</h4>
	<div class="py-4">
		<label for="add" class="block text-sm font-medium leading-6"
			>Todo Name</label
		>
		<input
			type="text"
			id="add"
			name="name"
			class="block border rounded-lg w-full md:w-1/2 py-1.5 pl-1 text-gray-900"
		/>
	</div>
	<button
		type="submit"
		class="bg-blue-500 hover:bg-blue-700 text-white w-full md:w-48 font-bold py-2 px-4 rounded"
	>
		Add
	</button>
</form>

<hr />

<div class="py-6">
	<h4 class="text-xl">Todos</h4>
	<ul id="todo-list" class="py-4">
		{{ range $todo := .Todos }} {{ template "todo" $todo }} {{ end }}
	</ul>
</div>
{{ end }}
```

Here you can see that I have used a base template that includes our basic html structure. We then override the title and body values in this file. But more importantly we can see the htmx directives in action. Take a look at the form. When submitting the `hx-post` attribute ensures that it makes a post request to the API with a todo name as a form value. This is how it's handled in the backend.

```go
// main.go

func add(c echo.Context) error {
	t := new(Todo)

	err := c.Bind(t)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}

	t.Id = uuid.New().String()

	todos = append(todos, t)

	return c.Render(http.StatusOK, "todo.html", t)
}
```

The backend will then respond with a new todo item in html format. This is how that looks like as a template.

```html
<!-- todo.html -->

{{ block "todo" . }}
<li id="todo-{{ .Id }}" class="flex py-1">
	<div
		hx-patch="/todos/{{ .Id }}"
		hx-target="#todo-{{ .Id }}"
		hx-swap="outerHTML"
		class="flex items-center p-1 w-full"
	>
		{{ if .Done }}
		<span class="line-through"> {{ .Name }} </span>
		{{ else }}
		<span> {{ .Name }} </span>
		{{ end }}
	</div>
	<div>
		<a
			hx-delete="/todos/{{ .Id }}"
			hx-target="#todo-{{ .Id }}"
			hx-swap="delete"
			class="block text-center w-8 leading-8 rounded-2xl bg-red-600 text-white font-bold cursor-pointer"
		>
			x
		</a>
	</div>
</li>
{{ end }}
```

This result is then added to the end of the list of the todos. This is because of the `hx-target` and `hx-swap` attributes. Notice that the list of todos uses this same html template. The resulting html also contains actions for deleting and toggling the item as done.

## Conclusion

As you can see that doing a simple application like this is really easy with Go's templating system and htmx. There's of course a lot to improve here if you want to develop a more serious app but that goes for any other demo application as well.

Please refer to the source code on [Github](https://github.com/markusryoti/htmx-todo) to find other missing parts like Tailwind integration and so on.
