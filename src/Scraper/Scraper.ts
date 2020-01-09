import puppeteer, { Browser } from "puppeteer";
import { IScraperStartOptions, IScraperOptions } from "./interfaces";
import { Codeforces, UVa, URI } from "../routines";

export default class Scraper {
  private _browser!: Browser;
  private _options: IScraperOptions;

  constructor(options: IScraperOptions = {}) {
    this._options = options;
  }

  async start({ headless = true }: IScraperStartOptions = {}): Promise<void> {
    try {
      this._browser = await puppeteer.launch({ headless });

      const { codeforces, uva, uri } = this._options;
      const logins: Promise<void>[] = [];

      if (codeforces) {
        logins.push(Codeforces.login(this._browser, codeforces.credentials));
      }

      if (uva) {
        logins.push(UVa.login(this._browser, uva.credentials));
      }

      if (uri) {
        logins.push(URI.login(this._browser, uri.credentials));
      }

      await Promise.all(logins);
    } catch (error) {
      // TODO: handle puppeteer launch error
    }
  }
}
