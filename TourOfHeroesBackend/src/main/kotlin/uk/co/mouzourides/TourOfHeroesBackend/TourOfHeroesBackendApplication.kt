package uk.co.mouzourides.TourOfHeroesBackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.*

@SpringBootApplication
class TourOfHeroesBackendApplication

fun main(args: Array<String>) {
    runApplication<TourOfHeroesBackendApplication>(*args)
}

data class Hero(val id: Int, val name: String)

@CrossOrigin(origins = ["http://localhost:4200"], maxAge = 3600)
@RestController
@RequestMapping(path = ["/api/heroes"])
class HeroesController {
    val heroList = listOf(
            Hero(id = 0, name = "Thor"),
            Hero(id = 1, name = "Iron Man"),
            Hero(id = 2, name = "Hulk"),
            Hero(id = 3, name = "Captain America"),
            Hero(id = 4, name = "Hawkeye"),
            Hero(id = 5, name = "Black Widow")
    )

    @PostMapping("/one")
    @ResponseBody
    fun getHeroesById(@RequestParam id: Int): Hero{
        return heroList[id]
    }

    @GetMapping("/all")
    @ResponseBody
    fun getAllHeroes(): Iterable<Hero>{
        return heroList
    }


}
