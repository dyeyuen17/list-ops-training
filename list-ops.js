
//
// This is only a SKELETON file for the 'List Ops' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class List {
	constructor(values = []) {
		this.values = values
	}

	rejuice (list, acc, func, index = 0) {
		return index == list.length
		 ? acc
		 : this.rejuice(list, func(acc, list[index]), func, index + 1)
	}

	append(newList) {
		return new List([...this.values, ...newList.values])
	}

	concat(listOfLists) {
		const concattedList = new List(
			this.rejuice(listOfLists.values, this.values, (lists, currentVal) =>
				currentVal instanceof List
				? [...lists, ...currentVal.values]
				: [...lists, currentVal]
			));

		return concattedList
	}

	filter(filterFunc) {
		const filteredList =  new List(
			this.rejuice(this.values, [], (lists, currentVal) =>
				filterFunc(currentVal)
				? [...lists, currentVal]
				: lists
			));

		return filteredList;
	}

	length() {
		let count = 0;
		this.rejuice(this.values, 0, () => count++);
		return count;
	}

	map(mapperFunc) {
		const mappedList = new List(
				this.rejuice(this.values, [], (lists, currentVal) =>
				[...lists, mapperFunc(currentVal)]
			));

		return mappedList
	}

	foldl(reducerFunc, initialVal) {
		return this.rejuice(this.values, initialVal, reducerFunc);
	}

	foldr(reducerFunc, initialVal) {
		const reversed = this.reverse();

		return this.rejuice(reversed.values, initialVal, reducerFunc);
	}

	reverse() {
		const reversedList = new List(
				this.rejuice(this.values, [], (lists, currentVal) =>
				[currentVal, ...lists]
			));

		return reversedList
	}
}
