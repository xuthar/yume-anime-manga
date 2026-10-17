import unittest
from importlib.machinery import SourceFileLoader

parse_page = SourceFileLoader('anime_import', 'import-anime-details.py').load_module().parse_page


class CreditsImportTests(unittest.TestCase):
    def test_plain_and_linked_themes_and_unicode(self):
        page = '''<html><head><meta property="og:url" content="https://myanimelist.net/anime/1/Test"></head><body>
        <div class="theme-songs opnening"><table><tr><td>"夢の歌"<span class="theme-song-artist"> by 歌手</span></td></tr></table></div>
        <div class="theme-songs ending"><table><tr><td><span class="theme-song-index">2:</span><a><span class="theme-song-title">"Second song"</span></a><span class="theme-song-artist"> by Artist</span><span class="theme-song-episode">(eps 3-4)</span><input id="youtube_url_1" value="https://www.youtube.com/watch?v=abcdefghijk"></td></tr></table></div></body></html>'''
        result = parse_page(page.encode('utf-8'), 1)
        self.assertEqual(result['openings'][0]['title'], '夢の歌')
        self.assertEqual(result['openings'][0]['artist'], '歌手')
        self.assertEqual(result['endings'][0]['index'], '2')
        self.assertEqual(result['endings'][0]['episodes'], '(eps 3-4)')
        self.assertEqual(result['endings'][0]['youtubeUrl'], 'https://www.youtube.com/watch?v=abcdefghijk')

    def test_mismatched_anime_is_rejected(self):
        with self.assertRaises(ValueError):
            parse_page(b'<meta property="og:url" content="https://myanimelist.net/anime/12/Wrong">', 1)

    def test_native_languages_are_preserved(self):
        page = '''<meta property="og:url" content="https://myanimelist.net/anime/1/Test"><h2 id="characters">Cast</h2><div class="detail-characters-list"><div><table><tr><td><h3><a href="https://myanimelist.net/character/1">Character</a></h3><div><small>Main</small></div></td><td><table><tr><td><a href="https://myanimelist.net/people/1">Actor</a><small>Mandarin</small></td></tr></table></td></tr></table></div></div>'''
        result = parse_page(page, 1)
        self.assertEqual(result['cast'][0]['voices'][0]['language'], 'Mandarin')
        self.assertEqual(result['cast'][0]['role'], 'Main')


if __name__ == '__main__':
    unittest.main()
