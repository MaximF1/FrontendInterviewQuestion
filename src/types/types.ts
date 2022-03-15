import { IImageData } from "../interfaces/interfaces";

type DataInStore = Array<IImageData>;
type SetDataState = null | DataInStore;

export type { DataInStore, SetDataState };