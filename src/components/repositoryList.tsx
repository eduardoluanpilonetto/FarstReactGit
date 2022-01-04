import { RepositoryItem } from "./repositoryIntem";
import { useEffect, useState } from "react";
import "../styles/repositoryStyle.scss"

interface IRepository{
    name: string,
    description: string,
    html_url: string
}

export function RepositoryList(){

    const [repositories, setRepositories] = useState<IRepository[]>([])

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
        .then(response => response.json())
        .then(data => setRepositories(data))
    }, [])

    console.log(repositories)

    return (
        <section className="repository-list">
            <h1>Lista de repositorios</h1>
            <ul>
                {repositories.map(repository => {
                    return  <RepositoryItem key={repository.name} repository={repository}/>
                })}
            </ul>
        </section>
    )
}