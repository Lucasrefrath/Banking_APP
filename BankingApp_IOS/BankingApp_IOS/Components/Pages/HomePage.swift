//
//  HomePage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct HomePage: View {
    
    @State private var accounts = [AccountDetails]()
    @State private var currentIndex: Int = 0
    @State private var offset: CGFloat = 0
    
    func fetchData() async {
        
        guard let url = URL(string: "http://localhost:8080/api-test/v1/adminAccounts") else {
            print("wrong url")
            return;
        }
        
        do {
            let (data, response) = try await URLSession.shared.data(from: url)
            
            if let decodedResponse = try? JSONDecoder().decode([AccountDetails].self, from: data) {
                accounts = decodedResponse
            }
        } catch {
            print("an error accured!")
        }
        
    }
    
    var body: some View {
        ScrollViewReader { proxy in
                    ScrollView(.vertical, showsIndicators: false) {
                        VStack(spacing: 15) { // Negative spacing for overlapping effect
                            ForEach(accounts, id: \.id) { account in
                                AccountPreview(accountDetail: account)
                            }
                        }
                        .padding()
                        .navigationTitle("Home")
                        .task {
                            await fetchData()
                        }
                    }
                }
    }
}
