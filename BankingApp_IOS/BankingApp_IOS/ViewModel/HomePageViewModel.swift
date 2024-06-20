//
//  HomeViewModel.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import SwiftUI

class HomePageViewModel: ObservableObject {
    
    @Published var allAccounts: [AccountDetailsModel] = []
    @Published var isPending = false
    
    func getAllAccounts() {
        isPending = true
        AccountsNetworkManager.shared.callGetAllAccounts { result in
            self.isPending = false
            DispatchQueue.main.async {
                switch result {
                    
                case .success(let dataResponse):
                    self.allAccounts = dataResponse
                    
                case .failure(let error):
                    print(error.localizedDescription)
                    
                }
            }
        }
    }
}
