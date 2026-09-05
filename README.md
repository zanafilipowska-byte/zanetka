# Szablon strony dla projektantki wnętrz

To prosty, responsywny szablon statyczny: landing, o mnie, portfolio (galeria), kontakt.

Instalacja lokalna:
1. Skopiuj pliki do folderu projektu.
2. Wstaw swoje zdjęcia do katalogu `images/`. Zmień nazwy w `index.html` (atrybuty `src` i `data-full`).
3. Otwórz `index.html` w przeglądarce.

Szybkie wdrożenie na GitHub Pages:
1. Utwórz repo (np. `portfolio`), dodaj pliki i zrób commit.
2. W ustawieniach repo: Pages -> wybierz branch `main` (lub `gh-pages`) i folder `/root` -> Save.
3. Po chwili strona będzie dostępna pod `https://<twoj-login>.github.io/<repo>/`.

Formularz kontaktowy:
- Przykładowo podłączyłem Formspree. Zarejestruj konto na Formspree i podmień `action` w formularzu na swój endpoint.
- Alternatywy: Netlify Forms, Backend (sendgrid/SMTP) lub prosty `mailto:`.

Optymalizacja zdjęć (ważne przy dużej liczbie zdjęć):
- Generuj wersje o różnych rozmiarach i używaj `srcset` / `picture` aby ładować odpowiedni rozmiar.
- Konwertuj do WebP (lepsza kompresja) i zachowaj JPEG jako fallback.
- Kompresuj narzędziami: Squoosh, ImageMagick, or jpegoptim / cwebp.
- Lazy-loading: dodaj `loading="lazy"` (już w szablonie).
- Rozważ hostowanie obrazów w CDN (Cloudflare Images, Cloudinary) aby odciążyć stronę i przyspieszyć dostarczanie.

Dostosowanie stylu:
- Kolory zmienisz w `:root` pliku `assets/css/styles.css`.
- Czcionki możesz podmienić w head (`Google Fonts`) i w CSS.

Dalsze usprawnienia (opcjonalnie):
- Dodanie srcset i generowanych miniaturek.
- Prezentacja kategorii z opisem projektu (modal z opisem).
- Integracja z Instagram/projektem do automatycznego pobierania miniatur.
- Dodanie CMS (np. Netlify CMS) jeśli chcesz samodzielnie dodawać projekty bez edycji kodu.

Potrzebujesz, żebym:
- Podmienił kolorystykę i dodał Twoje logo?
- Wygenerował wersje `srcset` i prosty skrypt do tworzenia miniaturek?
- Przygotował cały projekt w repo i wdrożył na GitHub Pages (jeśli podasz nazwę repo i chcesz aby zrobił to za Ciebie)?
